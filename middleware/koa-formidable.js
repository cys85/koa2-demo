const formidable = require('formidable')
module.exports = (opt) => 
  async (ctx, next) => {
    const form = new formidable.IncomingForm()
    for (const key in opt) {
      if (opt.hasOwnProperty(key)) {
        form[key] = opt[key]
      }
    }
    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err)
        } else {
          ctx.request.body = fields
          ctx.request.files = files
          resolve()
        }
      })
    })
    await next()
  }