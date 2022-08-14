'use-strict'


module.exports=()=>{
    return (new Intl.DateTimeFormat('en-GB').format(new Date()))
}