console.log( "=== simpread site bar load ===" )

import {storage} from 'storage';

import Button    from 'button';

export default class Sitebar extends React.Component {

    static defaultProps = {
        bgColors : {
            "global": "#fb584a",
            "custom": "#fa9a3f",
            "local": "#00a9f0",
        },
        labels: {
            "global": "官方适配源",
            "person": "站点集市",
            "custom": "第三方适配源",
            "local": "自定义适配源",
        },
        icons: {
            "global": '<i class="fas fa-globe"></i>',
            "person": '<i class="fas fa-user"></i>',
            "custom": '<i class="fas fa-newspaper"></i>',
            "local": '<i class="fas fa-laptop"></i>',
        }
    };

    state = {
        category: []
    };

    enable( obj ) {
    }

    componentWillMount() {
        const category = {};
        storage.pr.current.site.matching.forEach( item => {
            if ( category[item[2]] ) {
                category[item[2]].push( item );
            } else {
                category[item[2]] = [ item ];
            }
        });
        console.log( category )
        this.setState({ category });
    }

    render() {
        const child = Object.keys( this.state.category ).map( item => {
            const label   = this.props.labels[item];
            const actions = this.state.category[item].map( arr => {
                const [ url, site, type ] = [ arr[0], arr[1], arr[2] ],
                      color   = type != "person" ? "#fff" : site.info.color,
                      bgColor = type != "person" ? this.props.bgColors[type] : site.info.bgColor;
                return (
                    <Button ref={ "url" }
                            shape="circle" type="flat"
                            color={ color } backgroundColor={ bgColor }
                            fontIcon={ this.props.icons[type] }
                            tooltip={{ text: `点击后默认进入当前站点` }}
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.enable( arr ) } />
                )
            });

            return (
                <sr-opt-gp>
                    <sr-opt-label>{ label }</sr-opt-label>
                    <actions style={{ display: "flex", margin: "10px 0" }}>{ actions }</actions>
                </sr-opt-gp>
            )
        });

        return (
            <site-bar>{child}</site-bar>
        )
    }
}