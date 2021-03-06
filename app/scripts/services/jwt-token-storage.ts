module labsFrontendApp
{
    export interface JwtTokenStorage
    {
        /**
         * Put a token into the storage
         * @param token
         */
        put( token: string );

        /**
         * Get the token
         */
        get(): string
    }

    export class CookieJwtTokenStorage implements JwtTokenStorage
    {
        /**
         * Construct this
         * @param $cookies
         * @ngInject
         */
        constructor( private $cookies: ng.cookies.ICookiesService )
        {
        }

        /**
         * Put a token into the storage
         * @param token
         */
        public put( token: string )
        {
            this.$cookies.put( 'jwt', token, {secure: true} );
        }

        /**
         * Get the token
         */
        public get():string
        {
            return this.$cookies.get( 'jwt' );
        }
    }
}
