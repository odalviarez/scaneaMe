import React from 'react'
import {Tabs, Tab, TabPanel, TabList} from '../../lib'
import CardsDelete from '../cardsDashboard/CardsDelete'
import Card2 from '../cardsDashboard/CardsUpdate'
import EditProduct from '../cardsDashboard/CardsUpdate'
import CreateComponent from '../createComponent/createComponent'
import CustomTab from './CustomTab'
import i18n from '../../i18n'

class AdminUsers extends React.Component {
    constructor () {
        super()
        this.state = {activeTab: 'about'}
    }
    render () {
        const {activeTab} = this.state
        return (
            <div>
                <h1>{i18n.t("navbar.dashboard")}</h1>
                <Tabs activeTab={activeTab}>
                    <TabList className='text-center bg-light indent-bottom--medium'>
                        <Tab component={CustomTab} label='Create Product' id='create'/>
                        <Tab component={CustomTab} label='Update Product' id='update'/>
                        <Tab component={CustomTab} label='Delete Product' id='delete'/>
                        <Tab component={CustomTab} label='Edit Product' id='edit'/>
                    </TabList>
                    <TabList>

                        <TabPanel component={() => <div>
                            Create Product Here
                                <div>
                                    <CreateComponent />
                                </div>
                            </div>}                                 
                        id='create'/>
                        
                        <TabPanel component={() => <div>
                            Update Here
                                <div>
                                    <Card2 />
                                </div>
                            </div>}                       
                        id='update'/>
                        
                        <TabPanel component={() => <div>
                            Delete Here
                                <div>
                                    <CardsDelete />
                                </div>
                            </div>}
                        id='delete'/>

                        <TabPanel component={() => <div>
                            Delete Here
                                <div>
                                    <EditProduct />
                                </div>
                            </div>}
                        id='edit'/>

                    </TabList>
                </Tabs>
            </div>
        )
    }
}

export default AdminUsers