import React from 'react';

export const PV =(PMT,R,N)=>
{
    return Number(PMT*((1-(1/Math.pow((1+R),N)))/R)).toFixed(2);
}

export const FV = (PMT,R,N)=>
{
   return Number(PMT*(((1/Math.pow((1+R),N))-1)/R)).toFixed(2);
}

export const PMT=(PV,R,N)=>
{
    return Number(PV/((1-(1/Math.pow((1+R),N)))/R)).toFixed(2);
}

export const Interest = (PV,PMT,N) =>{
    return Number(((N*PMT-PV)/PV)*N/12*100).toFixed(2);
}