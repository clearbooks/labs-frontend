module labsFrontendApp
{
    export interface SubmitToggleFeedback
    {
        execute(toggleId: number, formData:any);
    }

    export class HttpSubmitToggleFeedback implements SubmitToggleFeedback
    {
        protected url = 'feedback/give';

        /**
         * @ngInject
         */
        constructor(private apiUrl: string, private simplePoster: SimplePoster) {}

        execute(toggleId: number, formData: any)
        {
            this.simplePoster.post(this.apiUrl + this.url,
                {toggleId: toggleId, mood: formData.mood, message: formData.message})
        }
    }
}