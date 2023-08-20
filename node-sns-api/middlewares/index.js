exports.isLoggedIn = (req, res, next) => {
  // passport 통해서 로그인 했니?
  if(req.isAuthenticated()){
    next()
  } else {
   res.status(403).send('로그인이 필요합니다.') 
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  // passport 통해서 로그인 안했니?
  if(!req.isAuthenticated()){
    next()
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.')
    res.redirect(`/?error=${message}`)
  }
}