import { useRegisterUserMutation } from '~/apiHooks/useRegisterUserMutation';

export default function Register() {
  const { mutate } = useRegisterUserMutation();

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    mutate({ email, password });
  };

  return (
    <div className='h-full'>
      <form method='post' className='flex flex-col gap-2' onSubmit={handleRegister}>
        <div className='flex gap-2'>
          <label htmlFor='email'>Email:</label>
          <input type='text' name='email' className='rounded-md bg-white/20 p-1' />
        </div>
        <div className='flex gap-2'>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' className='rounded-md bg-white/20 p-1' />
        </div>
        <button type='submit' className='bg-orange-600 rounded-md p-2 cursor-pointer'>
          Register
        </button>
      </form>
    </div>
  );
}
