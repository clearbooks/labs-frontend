module labsFrontendApp
{
    export class InMemoryCookiesService implements ng.cookies.ICookiesService
    {
        private __options: Object;

        constructor()
        {
            this.__options = {};
        }

        [index: string]: any;

        get(key: string): string
        {
            return <string>this.getObject(key);
        }

        getObject(key: string): any
        {
            return this[key];
        }

        getAll(): any
        {
            return this;
        }

        put(key: string, value: string, options?: any): void
        {
            this.putObject(key, value, options);
        }

        putObject(key: string, value: any, options?: any): void
        {
            this[key] = value;
            this.__options = options;
        }

        remove(key: string, options?: any): void
        {
            delete this[key];
            delete this.__options[key];
        }
    }
}
