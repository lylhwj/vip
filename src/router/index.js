import Vue from 'vue'
import Router from 'vue-router'
import Vip from '@/page/Vip'
import VipIndex from '@/page/VipIndex'
import Point from '@/page/Point'
import Coupon from '@/page/Coupon'
import Record from '@/page/Record' 
import PaySpace from '@/page/PaySpace'
import ContinuePay from '@/page/ContinuePay'
import PayPoint from '@/page/PayPoint'
import Info from '@/page/Info'
import Setting from '@/page/Setting' 
import Vip404 from '@/page/404'
import DataReport from '@/page/DataReport'
import HelpCenter from '@/page/HelpCenter'
import AgreementPay from '@/page/AgreementPay'
import AgreementUser from '@/page/AgreementUser'
import AgreementVip from '@/page/AgreementVip'
import AgreementPrivacy from '@/page/AgreementPrivacy'
import AgreementCopyright from '@/page/AgreementCopyright'
import AgreementLinkTask from '@/page/AgreementLinkTask'
import AboutUs from '@/page/AboutUs'
import Notice from '@/page/Notice'
import Login from '@/components/Login' 
import PageNotice1 from '@/page/PageNotice1'
import Success from '@/page/Success'
import TestAlert from '@/page/TestAlert'

Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  routes: [{
      path: '/',
      component: Vip,
      redirect: '/vip/index',
    },
    {
      path: '/vip',
      name: 'Vip',
      component: Vip,
      redirect: '/vip/index',
      children: [{
          path: '/vip/index',
          component: VipIndex,
          meta: {
            index: 0
          }
        }, 
        {
          path: '/vip/point',
          component: Point,
          meta: {
            index: 1
          }
        },
        {
          path: '/vip/coupon',
          component: Coupon,
          meta: {
            index: 2
          }
        },
        {
          path: '/vip/record',
          component: Record,
          meta: {
            index: 3
          }
        }, {
          path: '/vip/success',
          component: Success,
          meta: {
            index: 4
          }
        },
      ]
    }, {
      path: '/paySpace',
      name: 'PaySpace',
      component: PaySpace,
    }, {
      path: '/continuePay',
      name: 'ContinuePay',
      component: ContinuePay,
    }, {
      path: '/payPoint',
      name: 'PayPoint',
      component: PayPoint,
    }, {
      path: '/info',
      name: 'Info',
      component: Info,
    }, {
      path: '/setting',
      name: 'Setting',
      component: Setting,
    }, {
      path: '*',
      name: '404',
      component: Vip404,
      meta:{
        noLogin:true
      }
    }, {
      path: '/dataReport',
      name: 'DataReport',
      component: DataReport
    }, {
      path: '/helpCenter',
      name: 'HelpCenter',
      component: HelpCenter,
      meta:{
        noLogin:true
      }
    }, {
      path: '/agreementPay',
      name: 'AgreementPay',
      component: AgreementPay,
      meta:{
        noLogin:true
      }
    }, {
      path: '/agreementUser',
      name: 'AgreementUser',
      component: AgreementUser,
      meta:{
        noLogin:true
      }
    }, {
      path: '/agreementVip',
      name: 'AgreementVip',
      component: AgreementVip,
      meta:{
        noLogin:true
      }
    },{
      path: '/agreementPrivacy',
      name: 'AgreementPrivacy',
      component: AgreementPrivacy,
      meta:{
        noLogin:true
      }
    },{
      path: '/agreementCopyright',
      name: 'AgreementCopyright',
      component: AgreementCopyright,
      meta:{
        noLogin:true
      }
    },{
      path: '/agreementLinkTask',
      name: 'AgreementLinkTask',
      component: AgreementLinkTask,
      meta:{
        noLogin:true
      } 
    },{
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs,
      meta:{
        noLogin:true
      }
    },{
      path: '/notice',
      name: 'Notice',
      component: Notice,
      meta:{
        noLogin:true
      }
    },{
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        noLogin:true
      }
    }, {
      path: '/pageNotice1',
      name: 'PageNotice1',
      component: PageNotice1, 
      meta:{
        noLogin:true
      }
    }, {
      path: '/test',
      name: 'Test',
      component: TestAlert
    }
  ]
})
