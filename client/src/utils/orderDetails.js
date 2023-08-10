import instance from "../Axios/axios"


export const orderDetails = () => {
    instance.get('/orderDetails').then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}