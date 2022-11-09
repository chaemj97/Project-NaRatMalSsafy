import { useState, useEffect } from "react";
import Modal from './Modal.jsx'
import axios from 'axios'
import PostDaejeonItem from "./PostDaejeonItem.jsx";
import { Divider,Grid } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const PostDaejeon = () => {
    const navigate= useNavigate()
    const token = localStorage.getItem('token')
    const [userinfo, setUserinfo] = useState('')
    const [postinfo, setPostinfo] = useState([])
    const [ispostinfoempty, setIspostinfoempty] = useState(false)
    const [isfontinfoempty, setIsfontinfoempty] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          swal({
            title: "필요",
            text: "로그인이 필요합니다!",
            icon: "warning",
            button: "확인",
          }).then(() => {
            navigate("/login");
          });
        }
      }, []);
    useEffect(() => {
        axios({
            url: '/api/user',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type':'application/json'
            } 
        })
        .then(res => {
            setUserinfo(res.data)
            if (res.data.downloadFonts.length === 0 && res.data.myFonts.length === 0) {
                setIsfontinfoempty(true)
                console.log('여왔다')
            }
            else{
                setIsfontinfoempty(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
        axios({
            url: '/api/padlet/daejeon',
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            } 
        })
        .then(res => {
            setPostinfo(res)
            console.log(res.data.padletList.length)
            if(res.data.padletList.length === 0){
                setIspostinfoempty(true)
            }
            else{
                setIspostinfoempty(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    const [modalOpen, setModalOpen] = useState(false)
    
    const showModal = () => {
        setModalOpen(true)
    }
    const goBack = () => {
        window.location.href = '/padlet'
    }
    return(
        <div className="Post">
            <div className="Post__Title">
                <div className="Post__Title__Title">대전 패들릿</div>
                <div className="Post__Title__Content">싸피와의 추억을 동기들과 나누어 보아요.</div>
                <div className="Post__Title__Content1">
                    <div>아쉬웠던 기억, 후련한 기억, 공유하고 싶은 말을 남겨주세요!</div>
                    <div className="Post__Title__Content1__2">
                        <div className="Post__Back" onClick={goBack}>뒤로</div>
                        { !isfontinfoempty &&
                        <div>
                            { !ispostinfoempty && 
                                <div className="Post__Create" onClick={showModal}>생성</div>
                            }
                        </div>
                        }
                    </div>
                    
                </div>
            </div>
            <div className="custom_m_y_10">
                    <Divider />
            </div>
            { isfontinfoempty &&
                <div className="Post__FontEmpty">
                    <div className="Post__FontEmpty__Title">안녕하세요, {userinfo.userLocation}_{userinfo.userName}_{userinfo.userNickname}님!!!</div>
                    <div className="Post__FontEmpty__Content">아직 회원님만의 폰트나 다운로드한 폰트가 없어요  ˃̣̣̥᷄⌓˂̣̣̥᷅ </div>
                    <div className="Post__FontEmpty__Content">패들릿 작성전 폰트제작이나 다운로드를 해보아요 !!!</div>
                    <div className="Post__FontEmpty__Button"onClick={()=> navigate('/make-font')}>폰트제작하기</div>
                    <div className="Post__FontEmpty__Button"onClick={()=> navigate('/search')}>폰트보러가기</div>
                </div>
            }
            { !isfontinfoempty &&
            <div>
                { ispostinfoempty && 
                <div className="Post__PostEmpty">
                    <div className="Post__FontEmpty__Title">안녕하세요, {userinfo.userLocation}_{userinfo.userName}_{userinfo.userNickname}님</div>
                    <div className="Post__FontEmpty__Content">아직 대전 패들릿이 비어있어요!!!</div>
                    <div className="Post__FontEmpty__Content">가장 먼저 대전 패들릿에 글을 남겨 보아요 ˃́▿˂̀ </div>
                    <div className="Post__FontEmpty__Button" onClick={showModal}>첫 패들릿 남기기</div>
                </div>
                }
                { !ispostinfoempty &&
                <div>
                <div className="Post__Card">                    
                <Grid container spacing={3}>
                    {postinfo.map((data,idx) =>
                        postinfo.length -1 === idx ? (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <PostDaejeonItem
                                idx={idx}
                                postData={data}
                            />
                            </Grid>
                        ): (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <PostDaejeonItem
                                idx={idx}
                                postData={data}
                            />
                            </Grid>
                        )

                    )}
                </Grid>
                </div>
                </div>
                }
            </div>
            }
            {modalOpen && <Modal setModalOpen={setModalOpen} userinfo={userinfo}/>}
        </div>
    );
};

export default PostDaejeon;
