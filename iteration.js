function runtime(gen){
  //参数第一个为gen =>fn
  var args = Array.prototype.slice.call(arguments,1)
  //构建it生成器 执行上下文
  var it = gen.apply(this,args)
  //返回异步迭代器
  return Promise.resolve()
    .then(function handleNext(value) {
      var next = it.next(value)

      return (function handleResult(next){
          if(next.done){
            return next.value
          }else{
            return Promise.resolve(next.value)
              .then(handleNext,function handleError(err){
                return Promise.resolve(
                  it.throw(err)
                )
              })
          }
      })(next)
    })
}