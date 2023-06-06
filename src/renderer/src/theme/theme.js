import { createGlobalStyle } from 'styled-components';

export const Theme_light = createGlobalStyle`
    :root{
        --theme-color : rgb(151, 208, 255);
        --text:black;
        --2ntext:gray;
    
        --bg-1:linear-gradient(180deg, #e4f2ff 0%, #fff1df 100%);
        --bg-2:linear-gradient(90deg, #e4f2ff 0%, #fff1df 100%);
        --bg-3:linear-gradient(270deg, #e4f2ff 0%, #fff1df 100%);
        --bg-4:linear-gradient(200deg, #e4f2ff 0%, #fff1df 100%);
    
        --pg-scrollbar-t : rgba(0, 0, 0, 0.1);
        --pg-scrollbar-h : rgba(0, 0, 0, 0.14);
        --pg-scrollbar-a : rgba(0, 0, 0, 0.2);
    
    
        --sidebar:linear-gradient(270deg, #dbeeff 0%, #d8edff 100%);
        --sidebar-logo : rgba(0, 0, 0, 0.03);
        --sidebar-logo-hover : rgba(0, 0, 0, 0.1);
        --sidebar-logo-active : rgba(0, 0, 0, 0.2);
        --sidebar-card-bg : rgba(0, 0, 0, 0.08);
        --sidebar-card-btn : rgb(55, 55, 55);
        --sidebar-card-hover : rgba(0, 0, 0, 0.12);
        --sidebar-card-time-c : rgba(0, 0, 0, 0.12);
        --sidebar-card-time-m : rgba(0, 0, 0, 0.1);
        --sidebar-card-time-s : rgb(30, 30, 30);
    
        --user-card : rgba(0, 0, 0, 0.03);  
        --user-card-hover : rgba(0, 0, 0, 0.1);
        --user-card-active : rgba(0, 0, 0, 0.2);
        --user-card-level : rgba(0, 0, 0, 0.1);
    
        --maincard-bg:rgba(255, 255, 255, 0.6);
    
        --hover : rgba(0, 0, 0, 0.08);
        --active : rgba(0, 0, 0, 0.1);
    
        --search-input:rgba(255, 255, 255, 0.9);
        
        }
`
export const Theme_dark = createGlobalStyle`
    :root{
        --theme-color : #3793FF;
        --text: #cecece;
        --2ntext:#dfdfdf;
    
        --bg-1:linear-gradient(180deg, #323439 0%, #1c1e26 100%);
        --bg-2:linear-gradient(90deg,  #323439 0%, #1c1e26 100%);
        --bg-3:linear-gradient(270deg, #323439 0%, #1c1e26 100%);
        --bg-4:linear-gradient(200deg, #323439 0%, #1c1e26 100%);
    
        --pg-scrollbar-t : rgba(255, 255, 255, 0.1);
        --pg-scrollbar-h : rgba(255, 255, 255, 0.14);
        --pg-scrollbar-a : rgba(255, 255, 255, 0.2);
    
    
        --sidebar: #2a2c37;
        --sidebar-logo : rgba(255, 255, 255, 0.03);
        --sidebar-logo-hover : rgba(255, 255, 255, 0.1);
        --sidebar-logo-active : rgba(255, 255, 255, 0.3);
        --sidebar-card-bg : rgba(0, 0, 0, 0.4);
        --sidebar-card-btn : #cecece;
        --sidebar-card-hover : rgba(0, 0, 0, 0.1);
        --sidebar-card-time-c : #cecece80;
        --sidebar-card-time-m :  #cecece;
        --sidebar-card-time-s : #cecece;
    
        --user-card : rgba(255,255,255, 0.1);  
        --user-card-hover : rgba(255,255,255, 0.1);
        --user-card-active : rgba(255,255,255, 0.2);
        --user-card-level : rgba(255,255,255, 0.1);
    
        --maincard-bg:#37373760;
    
        --hover : #cecece20;
        --active : #3793FF;
    
        --search-input:rgba(0, 0, 0, 0.1);
        
        }
`;