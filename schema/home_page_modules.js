import gravity from '../lib/loaders/gravity';
import {
  keys,
  map,
  sortBy,
  first,
  filter,
} from 'lodash';
import Artwork from './artwork/index';
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const RESULTS_SIZE = 15;

const featuredFair = () => {
  return gravity('fairs', { size: 5, active: true }).then((fairs) => {
    if (fairs.length) {
      return first(sortBy(fairs, ({ banner_size }) =>
        ['x-large', 'large', 'medium', 'small', 'x-small'].indexOf(banner_size)
      ));
    }
  });
};

const featuredAuction = () => {
  return gravity('sales', { live: true, size: 1 }).then((sales) => {
    if (sales.length) {
      return first(sales);
    }
  });
};

// 'Random' gene that the user is following
const featuredGene = (accessToken) => {
  return gravity.with(accessToken)('me/follow/genes', { size: 1 }).then((follows) => {
    if (follows.length) {
      return first(follows).gene;
    }
  });
};

const moduleTitle = {
  active_bids: () => 'Your Active Bids',
  followed_artists: () => 'Works by Artists you Follow',
  followed_galleries: () => 'Works from Galleries you Follow',
  saved_works: () => 'Recently Saved Works',
  recommended_works: () => 'Recommended Works for You',
  live_auctions: () => {
    return featuredAuction().then((auction) => {
      if (auction) {
        return `At auction: ${auction.name}`;
      }
    });
  },
  current_fairs: () => {
    return featuredFair().then((fair) => {
      if (fair) {
        return `Art Fair: ${fair.name}`;
      }
    });
  },
  related_artists: () => 'Works by Related Artists',
  genes: (accessToken) => {
    return featuredGene(accessToken).then((gene) => {
      if (gene) {
        return gene.name;
      }
    });
  },
};

const moduleResults = {
  active_bids: () => [],
  followed_artists: (accessToken) => {
    return gravity
      .with(accessToken)('me/follow/artists/artworks', {
        for_sale: true,
        size: RESULTS_SIZE,
      });
  },
  followed_galleries: (accessToken) => {
    return gravity.with(accessToken)('me/follow/profiles/artworks', {
      for_sale: true,
      size: RESULTS_SIZE,
    });
  },
  saved_works: (accessToken) => {
    return gravity.with(accessToken)('me').then((user) => {
      return gravity
        .with(accessToken)('collection/saved-artwork/artworks', {
          size: RESULTS_SIZE,
          user_id: user.id,
          private: true,
          sort: '-position',
        });
    });
  },
  recommended_works: (accessToken) => {
    return gravity.with(accessToken)('me/suggested/artworks/homepage', { limit: RESULTS_SIZE });
  },
  live_auctions: () => {
    return featuredAuction().then((auction) => {
      if (auction) {
        return gravity(`sale/${auction.id}/sale_artworks`, { size: RESULTS_SIZE })
          .then((sale_artworks) => {
            return map(sale_artworks, 'artwork');
          });
      }
    });
  },
  current_fairs: () => {
    return featuredFair().then((fair) => {
      if (fair) {
        return gravity('filter/artworks', {
          fair_id: fair.id,
          for_sale: true,
          size: RESULTS_SIZE,
        }).then(({ hits }) => hits);
      }
    });
  },
  related_artists: () => [],
  genes: (accessToken) => {
    return featuredGene(accessToken).then((gene) => {
      if (gene) {
        return gravity('filter/artworks', {
          gene_id: gene.id,
          for_sale: true,
          size: RESULTS_SIZE,
        }).then(({ hits }) => hits);
      }
    });
  },
};

export const HomePageModulesType = new GraphQLObjectType({
  name: 'HomePageModules',
  fields: () => ({
    key: {
      type: GraphQLString,
    },
    display: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
      resolve: ({ key, display }, options, { rootValue: { accessToken } }) => {
        if (display) return moduleTitle[key](accessToken);
      },
    },
    results: {
      type: new GraphQLList(Artwork.type),
      resolve: ({ key, display }, options, { rootValue: { accessToken } }) => {
        if (display) return moduleResults[key](accessToken);
      },
    },
  }),
});

const HomePageModules = {
  type: new GraphQLList(HomePageModulesType),
  description: 'Modules to show on the home screen',
  args: {
    include_keys: {
      type: new GraphQLList(GraphQLString),
      description: 'A list of modules to return (by key)',
      defaultValue: false,
    },
  },
  resolve: (root, { include_keys }, { rootValue: { accessToken } }) => {
    if (include_keys && include_keys.length > 0) {
      return map(include_keys, (key) => {
        return { key, display: true };
      });
    }
    return gravity.with(accessToken)('me/modules').then((response) => {
      const modules = map(keys(response), (key) => {
        return { key, display: response[key] };
      });
      return filter(modules, ['display', true]);
    });
  },
};

export default HomePageModules;
