module labsFrontendApp
{
    export class SubmitToggleFeedbackSpy implements SubmitToggleFeedback
    {
        private toggleId: number;
        private formData: any;

        execute(toggleId: number, formData: any)
        {
            this.toggleId = toggleId;
            this.formData = formData;
        }

        getToggleId(): number
        {
            return this.toggleId;
        }

        getFormDataEntered(): any
        {
            return this.formData;
        }

    }
}