function skillsMember() {
    this.id = 0;
    this.name = "";
    this.skills = [];
    this.addSkill = function (skill) {
        this.skills.push(skill);
    }
    this.removeSkill = function (skill) {
        var index = this.skills.indexOf(skill);
        if (index > -1) {
            this.skills.splice(index, 1);
        }
    }
    this.toString = function () {
        return this.name;
    }

}