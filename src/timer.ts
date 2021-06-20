export class Timer {
    constructor(seconds: number = 0, htmlElementId: string = '') {
        this.seconds = seconds;
        this.startValue = seconds;
        this.htmlElementId = htmlElementId;
    }
    private startValue: number = 0;
    private htmlElementId: string = '';
    seconds: number = 0;
    cancelationToken: boolean = false;

    public async startAsync() {
        console.log('timer started');
        for (var i = this.seconds; i >= 0; i--) {
            if (this.cancelationToken)
                break;

            this.toTimer();
            await this.delayAsync(1000);
            this.seconds = this.seconds - 1;
        }
    }

    public reset() {
        this.seconds = this.startValue;
        this.stopExecution();
    }

    public stopExecution() {
        this.cancelationToken = true;
    }

    private toTimer(): void {
        var hours = Math.floor(this.seconds / 3600);
        var remaining = this.seconds - (hours * 3600);
        var minutes = Math.floor(((remaining) / 60));
        var seconds = remaining % 60;

        var toString = `${hours > 10 ? hours : '0' + hours}:${minutes > 10 ? minutes : '0' + minutes}:${seconds > 10 ? seconds : '0' + seconds}`;
        var element = document.getElementById(this.htmlElementId);

        if (element != null) {
            element.innerText = toString;
        } else {
            this.reset();
        }
    }

    private delayAsync(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}