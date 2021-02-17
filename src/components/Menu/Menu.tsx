import React, {Fragment, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores, IMenu, ISettings} from '@stores/interface';
import {useClassName} from '@hooks';
import $ from 'jquery';
import MenuStencil from '@components/Menu/Stencil/MenuStencil';
import SwiperCore, {Mousewheel} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import HorizontalScroll from 'react-scroll-horizontal';
import 'swiper/swiper.scss';
import './Menu.scss';
import {appStore} from '@stores/implementation';
import _ from 'lodash';

SwiperCore.use([Mousewheel]);

type TProps = {
	className?: string;
	settings?: ISettings;
	menu?: IMenu
}

const Menu = inject((stores: IStores) => ({
	menu: stores.appStore.menu,
	settings: stores.appStore.settings,
}))(
	observer((props: TProps) => {
		
		
		const [landscape, setLandscape] = useState($(window).width() < 845 && $(window).width() > 650 && $(window).height() < 500);
		const {cn, mergeClassName} = useClassName('menu');
		const {className, menu} = props;
		
		const saveAndRedirect = async () => {
			await appStore.saveAndUpload();
			let paramsString = document.location.search;
			let searchParams = new URLSearchParams(paramsString);
			
			if (searchParams.get('v')) {
				await appStore.saveAndUpload();
				window.location.href = `${window.location.href}`;
			} else {
				if (window.location.href.match(/\?./)) {
					window.location.href = `${window.location.href}&v=${appStore.funnelId}`;
				} else {
					window.location.href = `${window.location.href}?v=${appStore.funnelId}`;
				}
			}
			
			
		};
		const slidesPerView = () => {
			return $(window).width() / 70;
		};
		
		const slidesPerViewVertical = () => {
			return Math.floor($(window).height() / 70);
		};
		
		const resizeAction = () => {
			$('.sidebar-right-layout').removeClass('no-transition');
			$('.ant-layout-sider').removeClass('no-transition');
		};
		
		$(window).on('resize', () => {
			if (!$('.sidebar-right-layout').hasClass('no-transition') || !$('.ant-layout-sider').hasClass('no-transition')) {
				console.log('add');
				$('.ant-layout-sider').addClass('no-transition');
				$('.sidebar-right-layout').addClass('no-transition');
			}
			
			if ($(window).width() < 845 && $(window).width() > 650 && $(window).height() < 500) {
				if (landscape) {
				} else {
					setLandscape(true);
					saveAndRedirect();
				}
			} else {
				if (landscape) {
					setLandscape(false);
					saveAndRedirect();
				}
			}
			_.debounce(resizeAction, 300);
		});
		
		
		const check_OperationSystem = () => {
			let htmlclass;
			if (navigator.userAgent.indexOf('iPhone') != -1) {
				htmlclass = 'iphone';
			} else if (navigator.userAgent.indexOf('iPad') != -1) {
				htmlclass = 'ipad';
			} else if (navigator.userAgent.indexOf('Windows') != -1) {
				htmlclass = 'windows';
			} else if (navigator.userAgent.indexOf('Linux') != -1) {
				htmlclass = 'linux';
			} else if (navigator.userAgent.indexOf('Mac') != -1) {
				htmlclass = 'mac';
			} else if (navigator.userAgent.indexOf('FreeBSD') != -1) {
				htmlclass = 'freebsd';
			}
			return htmlclass;
		};
		
		let operationSystem = check_OperationSystem();
		
		
		return (
			<div className={mergeClassName(cn(), className)}>
				
				
				{/* Desktop version */}
				{
					$(window).width() > 845 ? (
						<Fragment>
							{
								operationSystem === 'mac' ? (
									<Fragment>
										{
											menu.items.map((item: any, index: number) => {
												return (
													<div className={cn('category')}>
														<MenuStencil
															data-category={item.category}
															isOpen={true}
															isActive={true}
															index={index}
														/>
													</div>
												);
											})
										}
									</Fragment>
								) : (
									<Fragment>
										<HorizontalScroll
											pageLock={true}
											reverseScroll={true}
										>
											{
												menu.items.map((item: any, index: number) => {
													return (
														<div className={cn('category')}>
															<MenuStencil
																data-category={item.category}
																isOpen={true}
																isActive={true}
																index={index}
															/>
														</div>
													);
												})
											}
										</HorizontalScroll>
									</Fragment>
								)
							}
						</Fragment>
					) : (<Fragment></Fragment>)
				}
				
				{/* Tablets version */}
				
				{
					$(window).width() < 845 && $(window).width() > 650 && $(window).height() > 500 ? (
						<Fragment>
							{
								operationSystem === 'mac' ? (
									<Fragment>
										{
											menu.items.map((item: any, index: number) => {
												return (
													<div className={cn('category')}>
														<MenuStencil
															data-category={item.category}
															isOpen={true}
															isActive={true}
															index={index}
														/>
													</div>
												);
											})
										}
									</Fragment>
								) : (<Fragment></Fragment>)
							}
							{
								operationSystem === 'windows' ? (
									<Fragment>
										<HorizontalScroll
											pageLock={true}
											reverseScroll={true}
										>
											{
												menu.items.map((item: any, index: number) => {
													return (
														<div className={cn('category')}>
															<MenuStencil
																data-category={item.category}
																isOpen={true}
																isActive={true}
																index={index}
															/>
														</div>
													);
												})
											}
										</HorizontalScroll>
									</Fragment>
								) : (<Fragment></Fragment>)
							}
							{
								operationSystem !== 'windows' && operationSystem !== 'mac' ? (
									<Fragment>
										<Swiper
											spaceBetween={0}
											slidesPerView={slidesPerView()}
											freeMode={false}
											onTransitionStart={() => menu.disable()}
											onTransitionEnd={() => setTimeout(() => menu.active(), 100)}
										>
											{
												menu.items.map((item: any, index: number) => {
													return (
														<SwiperSlide key={index}>
															<div className={cn('category')}>
																<MenuStencil
																	data-category={item.category}
																	isOpen={true}
																	isActive={true}
																	index={index}
																/>
															</div>
														</SwiperSlide>
													);
												})
											}
										</Swiper>
									</Fragment>
								) : (<Fragment></Fragment>)
							}
						</Fragment>
					) : (<Fragment></Fragment>)
				}
				
				
				{/* Mobile version */}
				{
					$(window).width() < 650 && $(window).height() > 500 ? (
						<Fragment>
							{
								operationSystem !== 'windows' && operationSystem !== 'mac' ? (
									<Fragment>
										<Swiper
											spaceBetween={0}
											slidesPerView={slidesPerView()}
											freeMode={false}
											onTransitionStart={() => menu.disable()}
											onTransitionEnd={() => setTimeout(() => menu.active(), 100)}
										>
											{
												menu.items.map((item: any, index: number) => {
													return (
														<SwiperSlide key={index}>
															<div className={cn('category')}>
																<MenuStencil
																	data-category={item.category}
																	isOpen={true}
																	isActive={true}
																	index={index}
																/>
															</div>
														</SwiperSlide>
													);
												})
											}
										</Swiper>
									</Fragment>
								) : (<Fragment>
									
									<HorizontalScroll
										pageLock={true}
										reverseScroll={true}
									>
										{
											menu.items.map((item: any, index: number) => {
												return (
													<div className={cn('category')}>
														<MenuStencil
															data-category={item.category}
															isOpen={true}
															isActive={true}
															index={index}
														/>
													</div>
												);
											})
										}
									</HorizontalScroll>
								
								</Fragment>)
							}
						</Fragment>
					) : (<Fragment></Fragment>)
				}
				
				{/* Landscape version */}
				
				{
					$(window).width() < 845 && $(window).width() > 650 && $(window).height() < 500 ? (
						<Fragment>
							<Swiper
								width={70}
								height={slidesPerViewVertical() * 70}
								spaceBetween={0}
								slidesPerView={slidesPerViewVertical()}
								freeMode={true}
								direction={'vertical'}
							>
								{
									menu.items.map((item: any, index: number) => {
										return (
											<SwiperSlide key={index}>
												<div className={cn('category')}>
													<MenuStencil
														data-category={item.category}
														isOpen={true}
														isActive={true}
														index={index}
													/>
												</div>
											</SwiperSlide>
										);
									})
								}
							</Swiper>
						</Fragment>
					) : (<Fragment>
					</Fragment>)
				}
			</div>
		);
	}),
);

export default Menu;
