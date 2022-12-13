import React from 'react'
import {Tabs, Tab, TabPanel, TabList} from '../../lib'
import CardsDelete from '../cardsDashboard/CardsDelete'
import CardUpdate from '../cardsDashboard/CardsUpdate'
import CreateComponent from '../createComponent/createComponent'
import CustomTab from './CustomTab'
import i18n from '../../i18n'

class AdminProducts extends React.Component {
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
                    </TabList>
                    <TabList>

                        <TabPanel component={() => <div>
                                <div>
                                    <CreateComponent />
                                </div>
                            </div>}                                 
                        id='create'/>
                        
                        <TabPanel component={() => <div>
                            <h3>Update Product Here</h3>
                                <div>
                                    <CardUpdate />
                                </div>
                            </div>}                       
                        id='update'/>
                        
                        <TabPanel component={() => <div>
                            <h3>Delete Product Here</h3>
                                <div>
                                    <CardsDelete />
                                </div>
                            </div>}
                        id='delete'/>

                    </TabList>
                </Tabs>
            </div>
        )
    }
}

export default AdminProducts