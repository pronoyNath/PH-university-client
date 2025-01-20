import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Define your endpoints here
        login: builder.mutation({
            query: (userInfo)=>{
                console.log("in----",userInfo)
                return{
                url: "/auth/login",
                method: "POST",
                body: userInfo
            }}
        })
    }),
})

export  const {useLoginMutation} = authApi;