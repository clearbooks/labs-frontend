module labsFrontendApp
{
    export class SimpleGetterSpy implements SimpleGetter
    {
        public url;
        public params;

        constructor( private $q: ng.IQService ) {}
        get<T>(url:string, params:Object):angular.IPromise<T>
        {
            this.url = url;
            this.params = params;
            return this.$q.defer().promise;
        }
    }

    export class SimplePosterSpy implements SimplePoster
    {
        public url;
        public params;

        constructor( private $q: ng.IQService ) {}
        post(url:string, params:Object):angular.IPromise<void>
        {
            this.url = url;
            this.params = params;
            return this.$q.defer().promise;
        }
    }
}