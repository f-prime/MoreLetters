bool mapsAreEqual(Map<String, double> a, Map<String, double> b) {
  if(a.keys.length != b.keys.length) {
    return false; 
  }

  for(var key in a.keys) {
    if(b[key] != a[key]) {
      return false;
    }
  }

  return true;
}
