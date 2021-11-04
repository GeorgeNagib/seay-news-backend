module.exports = strapi => {
    return {
      initialize() {
        strapi.app.use(async (ctx, next) => {
          // I just add custom code that logs `I have been called!`
          console.log('I have been called!');
          ctx.request.headers['Access-Control-Allow-Origin'] = '*';
          ctx.request.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE';
          ctx.request.headers['Access-Control-Allow-Headers'] = 'Content-Type';

          await next();
            
        });
      },
    };
  };
