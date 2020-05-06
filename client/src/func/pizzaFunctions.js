import axios from 'axios';

export const getAll = () =>{
    return axios.get('http://localhost:8000/api/pizzas',{
        headers:{'Content-Type' : 'application/json'}
    }).then(res=>{
       // console.log('lll'+res.data);
        return res.data;
    })
}

