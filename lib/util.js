exports.trim = function(toBeTrimmed){
  if (typeof toBeTrimmed != 'string') return toBeTrimmed;
  return toBeTrimmed.replace(/[\n\t]/g, '').trim()
}
