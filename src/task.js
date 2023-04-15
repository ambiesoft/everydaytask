
class Item {
    getId() {
        return -1;
    }
    isChecked() {
        return false;
    }
}
class Task extends Item {
    constructor(row, id, name, action, starttime, endtime, enabled) {
        super();
        this.row = row;
        this.id = id;
        this.name = name;
        this.action = action;
        this.starttime = starttime;
        this.endtime = endtime;
        this.enabled = enabled;
        this.checked = false;
    }

    getRow() {
        return this.row;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAction() {
        return this.action;
    }
    getStartTime() {
        return this.starttime;
    }
    getEndTime() {
        return this.endtime;
    }

    isEnabled() {
        return this.enabled;
    }
    setEnabled(b) {
        this.enabled = b;
    }

    isChecked() {
        return this.checked;
    }
    setChecked(b) {
        this.checked = b;
    }
}

class Separator extends Item {
    constructor(headText) {
        super();
        this.headText = headText;
    }
    getHeadText() {
        return this.headText;
    }
}
class ItemEmpty extends Item {
    constructor() {
        super();
    }
}

var gTasks = [];