// pm2.config.js
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/app.js',
      env: {
          NODE_ENV: process.env.NODE_ENV || 'prod',
          PORT: process.env.PORT || 3000,
          MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/task_management_db',
          REDIS_HOST:  process.env.REDIS_HOST || '127.0.0.1',
          REDIS_PORT: process.env.REDIS_PORT || '6379',
          ExpiryTimeForCache: process.env.ExpiryTimeForCache || '3600',
          SALT_ROUNDS:10,
          ACCESS_TOKEN_SECRET: 'a298a376496e025cea66e88e59c7312048a783b2ffec20d5fa4271d7cad6cc3ee2d7377b9752ba99b916f7a5fd3c74cd53dd750f1a919646380cc4391541631f18bb552171ea5859654fbb84d84199a6ab0a50133a9e2084b853effa591709280610b9813797353c1afabf5602eac724ea57e6f6c80c6711bc6c4a0c74cb29f906fc4a76cb2a5c784bfdbb0dafb5be261fb25bd99cee0c96153cefb6f1f1f7321d4c42afd197a489e6ce2befb221dd0112bb2f3efc9d349daf993f109e381f9331f392a70a4f86890323142afab04fbb3b74f1edcc743b831f8441e2b6ec9bfedf7e560d52cc532366024ee95eb96edf6db7759d9aa4df1c03d05613d44dedff',
          ACCESS_TOKEN_EXPIRATION: '1h',
          REFRESH_TOKEN_SECRET: '51b6c813db91273c18f77a93215dd12b8b3ab73d5aeb238413195aee7950ebadf589a29330a6928d06efc94d3c117b0f6b69c3b05d7790b95d7e6730c317fad92a62bd4b1ee0f80b53f1061cdcd3577f71e2302770d6cbf92ffc5e794013aee17e61ddb1adf3bd8a39ca2dd462371f58a58b31072c153d84780db98eca2124d40d30d07a8101ca50a374dc46eb79ffc2c25d634768d160a2b30a3f99cbaf8839b2dec0aae5909bb9202297d9f3be10a0f92fb44e619116362975c1a800b6266876061219bf3da060433c5bd7af29f995d5f8fb33c8075056da4c26d33ce367c0137db0599e2afef925eb0f61a9feb037c803d16e1cdde7d9718fe6fe1900a6ba',
          REFRESH_TOKEN_EXPIRATION: '7d',
          API_URL: 'https://api.elwazeer.tech',
      }
    },
  ],
};