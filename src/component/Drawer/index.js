import React from 'react'
import { Drawer, Button } from 'antd';


class CustomDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state= { visible: false, placement: this.props.placement || 'left',
        width : this.props.width || 440
        };
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { placement, visible, width } = this.state;
        return (
            <div className={this.props.className}>
                <Button type="primary" onClick={this.showDrawer}>
                        Open Drawer
                </Button>
                <Drawer
                    title="Top 10"
                    width={width}
                    placement={placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                    key={placement}
                >
                    {this.props.children}
                </Drawer>
            </div>
        );
    }
}

export default  CustomDrawer