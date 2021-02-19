module labsFrontendApp
{
    export class InMemoryJwtTokenStorage implements JwtTokenStorage
    {
        private jwt: string;

        /**
         * Put a token into the storage
         * @param token
         */
        public put(token: string)
        {
            this.jwt = token;
        }

        /**
         * Get the token
         */
        public get():string
        {
            return this.jwt;
        }
    }
}
