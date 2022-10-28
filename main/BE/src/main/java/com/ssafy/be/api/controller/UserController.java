package com.ssafy.be.api.controller;

import com.ssafy.be.api.request.UserLoginReq;
import com.ssafy.be.api.response.UserLoginRes;
import com.ssafy.be.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/user")
@RestController

public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/checknickname/{nickname}")
    public ResponseEntity<Boolean> checkNickname(@PathVariable String nickname){
        //닉네임 있는지 확인
        boolean res = userService.checkNickname(nickname);
        return ResponseEntity.status(200).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginRes> login(@RequestBody UserLoginReq loginReq){
        UserLoginRes res = userService.login(loginReq.getCode());
        return ResponseEntity.status(200).body(res);
    }

    @ResponseBody
    @GetMapping("/kakao")
    public void kakaoCallback(@RequestParam String code){
        System.out.println(code);
    }



}