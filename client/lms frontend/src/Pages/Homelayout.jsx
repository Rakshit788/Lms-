import React from 'react';
import { BsList } from 'react-icons/bs';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Space, Menu ,  Button , Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const items = [
  {
    key: '1',
    type: 'group',
    label: 'Group title',
    children: [
      {
        key: '1-1',
        label: 'Web development',
        
      },
      {
        key: '1-2',
        label: 'Data  structures and Algo',
      },
    ],
  },
  {
    key: '2',
    label: 'Cs Fundamentals',
    children: [
      {
        key: '2-1',
        label: 'OS',
      },
      {
        key: '2-2',
        label: 'OOPS',
      },
    ],
  },
  {
    key: '3',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      {
        key: '3-1',
        label: '5th menu item',
      },
      {
        key: '3-2',
        label: '6th menu item',
      },
    ],
  },
];

const content = (
  <div className='w-[300px] h-[100px]'>
 <p className='text-black font-bold px-2 text-[17px]'>Gets your team acess over 2500 top any time anywhere  courses </p>
 <div className='flex  justify-center'>
 <button className='   bg-gray-800 rounded-lg text-white w-[100px] h-[40px] mt-[5px]'> try business</button>
 </div>
  </div>
);

const content1 = (
  <div className='w-[300px] h-[100px]'>
 <p className='text-black font-bold px-2 text-[17px]'>Start learning from 2300 courses now</p>
 <div className='flex  justify-center'>
 <button className='   bg-white  hover:bg-slate-400  text-gray-800 w-[200px] px-3 h-[50px] mt-[5px]'>Explore now</button>
 </div>
  </div>
);


const profile  =  (
  <div className='flex flex-col w-[180px] h-[200px] gap-[6px]'>
    <Link className=" hover:text-purple-500 hover:underline px-5 text-[16px]">My Learnings</Link>
    <Link className=" hover:text-purple-500 hover:underline px-5 text-[16px]">My cart </Link>
    <Link className=" hover:text-purple-500 hover:underline px-5 text-[16px]" to={'/updateprofile'}>Account  settings</Link>
    <Link className=" hover:text-purple-500 hover:underline px-5 text-[16px]">Purchase History</Link>
  </div>

) ;


function Homelayout({ children }) {
 const authbtn  =  useSelector((state) => state.auth.isLoggedin)

  const dataUsername = useSelector(state => state.auth.username);
 

  return (
    <>
      <div className='bg-white flex flex-col w-full'>
        <div className='bg-white  border-gray-500 border-b-[1px] h-[80px] flex flex-row '>
          <Link to={'/aboutus'} className='text-black font-bold px-2 mt-[12px] text-[30px]'>
            E Guru
          </Link>
          <div>
            <Dropdown
              overlay={
                <Menu items={items} />
              }
            >
              <a onClick={e => e.preventDefault()}>
                <Space className=' text-black  mt-[20px] ml-[38px] px-2  text-[18px]'>
                 Categories
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          <div className=' w-[500px] ml-[40px]  mt-[4px] rounded-[26px] '>
             <input type="text" 
             placeholder=' Enter your categories'
             className='w-full h-[40px] border-[1px] border-black   rounded-[26px] text-black mt-[10px]  bg-transparent px-2'/>
             
          </div>
      <div className='mt-[20px] ml-[30px] '>
      <Popover content={content} >
 <Link className=' bg-transparent text-black hover:bg-transparet  text-[18px] '>Business</Link>
  </Popover>
      </div>
      <div className='mt-[20px] ml-[30px] '>
      <Popover content={content1} >
 <Link className=' bg-transparent text-black hover:bg-transparet  text-[18px] '>My learning</Link>
  </Popover>
      </div>


          <div className=' ml-[200px] mt-[10px]   flex flex-row gap-3'>
           
            {authbtn ? (
        <Popover content = {profile} className=' ml-[7px] rounded-[1000%] bg-black text-white text-bold text-[20px] h-[53px] w-[53px] py-[9px] text-center'>
          {dataUsername.charAt(0).toUpperCase()}
        </Popover>
      ) : (
        <button className="bg-black text-white font-bold border-transparent w-[100px] h-[43px] rounded-[20px]">
          <Link to="/login">Log In</Link>
        </button>
      )}
          </div>
           
        </div>
        <div className='h-screen bg-white'>{children}</div>
        
      </div>
    </>
  );
}

export default Homelayout;




 