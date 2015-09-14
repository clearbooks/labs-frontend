module labsFrontendApp
{
    export class ToggleAutoSubscribeSpy implements ToggleAutoSubscribe
    {
        private executed= false;

        execute()
        {
            this.executed = true;
        }

        public getExecuted()
        {
            return this.executed;
        }

    }
}