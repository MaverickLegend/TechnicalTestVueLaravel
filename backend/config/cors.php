<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS & Access-Control-Allow-Origin
    |--------------------------------------------------------------------------
    |
    | Here you can configure the Cross-Origin Resource Sharing (CORS) settings.
    | You can set which origins, methods, and headers are allowed for your API
    | requests. You can also configure CORS for different routes in your app.
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['*'], // Permite todos los métodos HTTP

    'allowed_origins' => ['*'], // Permite todas las URLs de origen

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Permite todos los encabezados

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
