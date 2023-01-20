const bcyrpt = require('bcrypt')


async function getSalt() {
    const salt = await bcyrpt.genSalt()
    const password = '12345';
    const pwdHash = await bcyrpt.hash(password, salt)
    console.log(salt);
    console.log(pwdHash);
}
getSalt()