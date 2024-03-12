const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        first: String,
        last: String
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

userSchema
    .virtual('fullName')
    .get(function() {
        return `${this.first} ${this.last}`;
    })
    .set(function() {
        const [first, last] = fullName.split(' ');
        this.first = first;
        this.last = last;
    });


// initialize User schema
const User = model('User', userSchema);

module.exports = User;