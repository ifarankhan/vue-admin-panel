<template>
<div class="p-5">
   <div class="p-4 mx-4">
        <div class="flex items-center">
            <div class="relative flex items-center text-teal-600">
                <div class="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-teal-600 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark ">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-teal-600 uppercase">Personal</div>
            </div>
            <div class="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600"></div>
           <div class="relative flex items-center text-teal-600">
              <div class="w-12 h-12 py-3 transition duration-500 ease-in-out bg-teal-600 border-2 border-teal-600 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus ">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                </div>
                <div class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-teal-600 uppercase">Account</div>
            </div>
            <div class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300"></div>
            <div class="relative flex items-center text-gray-500">
                <div class="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-gray-300 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail ">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>
                <div class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-gray-500 uppercase">Message</div>
            </div>
            <div class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300"></div>
            <div class="relative flex items-center text-gray-500">
                <div class="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-gray-300 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database ">
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </svg>
                </div>
                <div class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-gray-500 uppercase">Confirm</div>
            </div>
        </div>
    </div>
    <div class="p-4 mt-8">
        <div>
            <div class="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">Full Name</div>
            <div class="flex flex-col md:flex-row">
                <div class="flex-1 w-full mx-2 svelte-1l8159u">
                    <div class="flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="First Name" class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"> </div>
                </div>
                <div class="flex-1 w-full mx-2 svelte-1l8159u">
                    <div class="flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Last Name" class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"> </div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row">
                <div class="flex-1 w-full mx-2 svelte-1l8159u">
                    <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"> Username</div>
                    <div class="flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Just a hint.." class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"> </div>
                </div>
                <div class="flex-1 w-full mx-2 svelte-1l8159u">
                    <div class="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase"> Your Email</div>
                    <div class="flex p-1 my-2 bg-white border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="jhon@doe.com" class="w-full p-1 px-2 text-gray-800 outline-none appearance-none"> </div>
                </div>
            </div>
        </div>
        <div class="flex p-2 mt-4">
            <button class="flex justify-center px-4 py-2 text-base font-bold text-gray-700 transition duration-200 ease-in-out bg-gray-100 border border-gray-600 rounded cursor-pointer hover:scale-110 focus:outline-none hover:bg-gray-200">Previous</button>
            <div class="flex flex-row-reverse flex-auto">
                <button class="flex justify-center px-4 py-2 ml-2 text-base font-bold text-teal-100 transition duration-200 ease-in-out bg-teal-600 border border-teal-600 rounded cursor-pointer hover:scale-110 focus:outline-none hover:bg-teal-600">Next</button>
                <button class="flex justify-center px-4 py-2 text-base font-bold text-teal-700 transition duration-200 ease-in-out bg-teal-100 border border-teal-600 rounded cursor-pointer hover:scale-110 focus:outline-none hover:bg-teal-200">Skip</button>
            </div>
        </div>
    </div>
</div>

<!-- Bottom Navigation -->	
		<div class="fixed bottom-0 left-0 right-0 py-5 bg-white shadow-md" x-show="step != 'complete'">
			<div class="max-w-3xl px-4 mx-auto">
				<div class="flex justify-between">
					<div class="w-1/2">
						<button
							x-show="step > 1"
							@click="step--"
							class="w-32 px-5 py-2 font-medium text-center text-gray-600 bg-white border rounded-lg shadow-sm focus:outline-none hover:bg-gray-100" 
						>Previous</button>
					</div>

					<div class="w-1/2 text-right">
						<button
							x-show="step < 3"
							@click="step++"
							class="w-32 px-5 py-2 font-medium text-center text-white bg-blue-500 border border-transparent rounded-lg shadow-sm focus:outline-none hover:bg-blue-600" 
						>Next</button>

						<button
							@click="step = 'complete'"
							x-show="step === 3"
							class="w-32 px-5 py-2 font-medium text-center text-white bg-blue-500 border border-transparent rounded-lg shadow-sm focus:outline-none hover:bg-blue-600" 
						>Complete</button>
					</div>
				</div>
			</div>
		</div>
</template>