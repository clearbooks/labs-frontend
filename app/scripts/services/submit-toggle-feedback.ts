module labsFrontendApp
{
    export interface SubmitToggleFeedback
    {
        execute();
    }

    export class HttpSubmitToggleFeedback implements SubmitToggleFeedback
    {
        protected url = 'toggle/change-status';

        /**
         * @ngInject
         */
        constructor() {}

        execute()
        {

        }
    }
}