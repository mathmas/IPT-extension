class PageOrchestrator {
    constructor() {
        this.actions = [];
    }

    registerAction(action) {
        this.actions.push(action);
    }

    start(intervalMs) {
        setInterval(() => {
            this.actions.forEach(action => {
                try {
                    action.execute();
                } catch (error) {
                    console.error("[Orchestrator] Error executing action: ", error);
                }
            });
        }, intervalMs);
    }
}

const orchestrator = new PageOrchestrator();

orchestrator.registerAction(new LabelAutofiller());

orchestrator.start(500);