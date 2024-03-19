import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'

const Login = () => {
    const { loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        dispatch(userLogin(data))
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-slate-50'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-2xl font-bold mb-5'>Login Here</h2>
                <div className='min-w-96'>
                    <div className='mb-2'>
                        <input
                            type="text"
                            {...register('name', { required: true, minLength: 2})}
                            required className='px-3 py-4 border w-full'
                            placeholder='Name'
                        />
                        {errors.name && <p className='text-sm text-red-500 mt-1'>Name must contain at least 2 characters.</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            {...register('email',
                                { 
                                    required: true,  
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                                })
                            }
                            required
                            className='px-3 py-4 mb-2 border w-full'
                            placeholder='Email'
                        />
                        {errors.email && <p className='text-sm text-red-500 mt-1'>Email must be valid.</p>}

                    </div>
                    <div>
                        <input
                            type="text"
                            {...register("password", { 
                                required: true, 
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                            })}
                            required
                            className='px-3 py-4 mb-2 border w-full'
                            placeholder='Password' 
                        />
                        {errors.password && <p className='text-sm text-red-500 mt-1'>Please check the Password</p>}
                    </div>

                    <button type="submit" className='bg-black text-white py-3 mt-2 w-full'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login