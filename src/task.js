class Item {
  getId() {
    return -1;
  }
  isChecked() {
    return false;
  }
}
class Task extends Item {
  constructor(row, id, name, action, memo, starttime, endtime, enabled) {
    super();
    this.row = row;
    this.id = id;
    this.name = name;
    this.action = action;
    this.memo = memo;
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
  getFirstUrlAction() {
    if (!this.action) return null;
    const urls = this.action.split(/\s+/);
    if (!urls) return null;
    for (let url of urls) {
      if (isValidURL(url)) {
        return url;
      }
    }
    return null;
  }
  getMemo() {
    return this.memo ?? '';
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
  getTimeRangeAsString() {
    let s = this.starttime ?? '0:00';
    let e = this.endtime ?? '24:00';
    return `${s} - ${e}`;
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
