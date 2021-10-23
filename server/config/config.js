//=======================================
//PUERTO!
//=======================================
process.env.PORT = process.env.PORT || 4000;
//=======================================
//Entrono!
//=======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//=======================================
//database!
//=======================================
if (process.env.NODE_ENV === 'dev') {

    process.env.DB_username = "root";
    process.env.DB_password = "";
    process.env.DB_database = "la_tiendita_db";
    process.env.DB_host = "localhost";

} else {
    process.env.DB_username = "uktdrnklv6gtp62e";
    process.env.DB_password = "EAOxDglrmrTfCYt6xOUF";
    process.env.DB_database = "bgndt5zagupygewnt2un";
    process.env.DB_host = "bgndt5zagupygewnt2un-mysql.services.clever-cloud.com";
}
//=======================================
//SEED de authentication!
//=======================================
process.env.SEED = process.env.SEED || 'seed-desarrollo';
//=======================================
//Client Id Google
//=======================================
process.env.google_CLIENT_ID = process.env.google_CLIENT_ID || '874890766594-nvtjegg16skrvams1124cndknssjc4d3.apps.googleusercontent.com';
// process.env.google_CLIENT_ID = process.env.google_CLIENT_ID || '387697216987-83von8lcq3gachr35mbj36t15gbv5jll.apps.googleusercontent.com';
