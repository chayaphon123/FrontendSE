export interface ReservationItem {
    rsvDate: string,
    _id: string,
    restaurant: RestaurantItem,
    createdAt: string,
    id: string
   
}
export interface ReservationJson{
    success: boolean,
    count: number,
    pagination: Object,
    data: ReservationItem[]
}
export interface RestaurantItem{
    name: string,
    tel: string,
    openningtime: string,
    restaurant: string,
    website: string,
    priceRange: number,
    _id: string,
    id: string,
}
export interface RestaurantJson{
    success: boolean,
    count: number,
    pagination: Object,
    data: RestaurantItem[]
}
export interface ReviewItem{
    comment: string,
    rating: string,
    _id: string,
    id: string,
}
export interface ReviewJson{
    success: boolean,
    count: number,
    pagination: Object,
    data: ReviewItem[]
}


export interface PromotionItem {
    name: string,
    detail: string,
    restaurant: RestaurantItem,
    startDate: Date,
    endDate: Date,
    _id: string,
    id: string
}
export interface PromotionJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: PromotionItem[]
}

export interface MenuJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: MenuItem[]
}

export interface menureviewsItem {
    _id: string,
    rating: number,
    comment: string,
    user: string,
    menu: string
}

export interface promotionsItem {
    name: string,
    detail: string,
    restaurant: RestaurantItem,
    startDate: Date,
    endDate: Date,
    _id: string,
    id: string
}

export interface menupromotionsItem {
    _id: string,
    name: string,
    detail: string,
    restaurant: string,
    startDate: string,
    endDate: string
}

export interface MenuItem {
    _id: string,
    name: string,
    price: number,
    restaurant: string,
    menureviews: menureviewsItem[],
    promotions: PromotionItem[],
    id: string
}




