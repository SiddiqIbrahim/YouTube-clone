 export const APT_KEY = 'AIzaSyCRP-GQ8hKnFt8sSLQ8K2-DNDtMrLO3aAM'
  export const value_converter = (value) => {
    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000 ) 
    {
        return Math.floor(value/1000)+"K    "
    }
    else{
        return value
    }
 }