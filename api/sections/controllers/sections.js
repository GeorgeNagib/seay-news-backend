'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    find: async function(ctx) {
        const sectionsModel = strapi.query('sections').model;
        const adsModel = strapi.query('ads').model;
        const {page = 'home'} = ctx.query;
    
        const ads = await adsModel.findOne({page});

        const sections =  await sectionsModel.find(
            {},
            {
                premiumPosts: {
                    $slice: [
                        0,11
                    ],        
                }
            }
        ).populate([{path: 'premiumPosts'}]).sort({rank: 1})

        return {
            ads,
            sections
        }
    },

    findByName: async function(ctx) {
        const sectionsModel = strapi.query('sections').model;
        const adsModel = strapi.query('ads').model;
        const postsModel = strapi.query('posts').model;

        const {page = 'home', limit = 7} = ctx.query;
        const {sectionName} = ctx.params;
        const ads = await adsModel.findOne({page});

        const sectionData =  await sectionsModel.findOne(
            {name: sectionName},
            {
                premiumPosts: {
                    $slice: [
                        0,11
                    ],        
                }
            }
        ).populate([{path: 'premiumPosts'}]);
        
        if(!sectionData) return null;

        const otherPosts = await postsModel.find({section: sectionData._id}).limit(Number(limit))

        const sectionsNames = await sectionsModel.find({}, {name: 1,rank:1}).sort({rank: 1});
        
        return {
            ads,
            section: sectionData,
            otherPosts,
            sectionsNames
        }
        
    },
    findSectionsNames: async function() {
        const sectionsModel = strapi.query('sections').model;
        return await sectionsModel.find({}, {name: 1, rank:1}).sort({rank: 1})
    }
}
