import React, { useState, useEffect } from "react";
import Skeleton from "..//..//..//Components/Skeletons/campaign";
import { useParams } from "react-router-dom";
import styles from "./campaignBlog.module.css";
import axios from "axios";
import Background from "../../../Components/backgroundComponent/Background";
import Button from "../../../Components/tailwindButton/Button";
const CampaignBlog = () => {
  // const [id, setId] = useState();
  const { campaignId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [age, setAge] = useState();
  const [startDate, setStartDate] = useState();
const [endDate, setEndDate] = useState();
const [appEndDate, setAppEndDate] = useState();
  // console.log(campaignId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${url}/api/campaigns/${campaignId}`);
  
        const dataJson = response.data;
  
        // Convert start date format
        let startDate = new Date(dataJson.start_date);
        let formattedStartDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        // Convert end date format
        let endDate = new Date(dataJson.end_date);
        let formattedEndDate = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        // Convert application end date format
        let appEndDate = new Date(dataJson.application_deadline);
        let formattedAppEndDate = appEndDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        // Update state variables
        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
        setAppEndDate(formattedAppEndDate);
  
        setIsLoading(false);
        setData(dataJson);
        setAge(dataJson.age_group);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [campaignId]);
  
  const ageAccess=()=>{
    if(age===0){
      return "Open to All Age Groups";
        }
        else{
          return (age+ "+");
        }
  }
  return (
    <div>
      <>
        {!isLoading && (
          <>
          <Background />
          <div className="font-breeSerif">
          <h1 className="bg-gradient-to-b from-[rgba(175,255,171,0.68)] to-[rgba(29,239,36,0.68)] via-[rgba(110,255,117,0.68)] text-center font-breeSerif text-[#0B0553] text-3xl drop-shadow-xl font-bold rounded-[30px] shadow-dashBoardCardImageShadow p-4 w-[90%] mx-auto mt-[30px] mb-5">{data.title}</h1>
            <small className="text-[#0B0553] pb-[15px] tracking-wider font-bold float-right mr-4 text-sm">
              <i>
                Organised By- <u> {data.ngo_name}</u>
              </i>
            </small>
            <br />
            <div className=" py-[8px] h-fit px-[15px] w-[95vw] flex flex-col rounded-3xl shadow-dashBoardCardImageShadow bg-[#ffffff66] mb-[120px] backdrop-blur-[5px] m-auto">
            <h2 className="p-[10px] text-[#0B0553] text-2xl drop-shadow-xl ">
                <i>Description:</i>
              </h2>
            <div className="max-w-full h-fit px-3 flex flex-col items-center text-left justify-center overflow-x-hidden">
              {data.description}
              {/* LIST CONTAINER */}
                  <div className="flex mt-[5px] w-full flex-col gap-[5px]">
                  <li className="list-none">
                    <b> Campaign starts on: </b>
                    {startDate}
                  </li>
                  <li className="list-none">
                    <b> Campaign ends on: </b>
                    {endDate}
                  </li>
                  <li className="list-none">
                    <b>Application Deadline: </b>
                    {appEndDate}
                  </li>
                  {/* <li className="list-none">
                    <b> Duration: </b>
                    {(new Date(data.end_date.split('T')[0]) - new Date(data.start_date.split('T')[0])) / (1000 * 60 * 60 * 24)} Days
                  </li> */}
                  <li className="list-none">
                  <b className="mr-[5px]">  Age Accessibility:</b>{ageAccess()} 
                  </li>
              
              </div>
              <br />
              <p className="w-full">
                For inquiries, contact us on:
                <li>{data.phone_number}</li>
                <li>{data.email}</li>
              </p>

              <img className="w-full rounded-[20px] object-center mt-[10px] shadow-dashBoardCardImageShadow" src={data.image_link} alt="" />
              <br />
              <p className="font-normal w-full text-base flex flex-wrap gap-[5px]">
                {data.tags &&
                  data.tags.map((item, index) => (
                    <span className="bg-gray-300 px-5 shadow-dashBoardCardImageShadow py-2 rounded-[20px] border " key={index}>
                      {item} <br></br>
                    </span>
                  ))}
              </p>
              <div className="mt-4 w-full flex flex-wrap justify-evenly gap-4">
              <Button
                text="Show Interest"
                clas=" text-2xl text-white font-normal focus:outline-none rounded-[30px] shadow-buttonShadow bg-gradient-to-b from-green-300 to-green-800 mb-7"
              />
            </div>
            </div>
            </div>
            </div>
          </>
        )}
        {isLoading &&(
          <div className={styles.skeltonContainer}>
          <Skeleton  width={370} height={120}/>
          </div>

        )}
      </>
    </div>
  );
};

export default CampaignBlog;
