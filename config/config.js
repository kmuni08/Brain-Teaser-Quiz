var env = process.env.NODE_ENV || 'development';
console.log('env *********', env);

if(env === "development" || env === "production") {
  var config = require('/Users/karishmamuni/WebstormProjects/Brain-Teaser-Quiz/config/config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })

}
