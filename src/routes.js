import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./pages/login/login";
import HomeScreen from "./pages/principal/index";
import HelpScreen from "./pages/help/index";
import PerfilScreen from "./pages/perfil/index";
import PagamentoScreen from "./pages/pagamento/index";
import PagamentoCartaoScreen from "./pages/pagamento-cartao/index";
import PainelSenhaScreen from "./pages/painel-senha/index";
import SucessoScreen from "./pages/sucesso-pagamento/index";
import RetiradaScreen from "./pages/retirada/index";
import SucessoRetiradaScreen from "./pages/sucesso-retirada/index";


const StackNavigation_ = (authenticaded) => createStackNavigator(
    {

        Login: {
            screen: LoginScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                    // headerLeft:
                }
            }
        },

        Help: {
            screen: HelpScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                    // headerLeft:
                }
            }
        },
        Principal: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                    // headerLeft:
                }
            }
        },
        Perfil: {
            screen: PerfilScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                    // headerLeft:
                }
            }
        },
        Retirada: {
            screen: RetiradaScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                }
            }
        },
        Pagamento: {
            screen: PagamentoScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                }
            }
        },
        PagamentoCartao: {
            screen: PagamentoCartaoScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                }
            }
        },
        PainelSenha: {
            screen: PainelSenhaScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                }
            }
        },
        Sucesso: {
            screen: SucessoScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                }
            }
        },

        SucessoRetirada: {
            screen: SucessoRetiradaScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerShown: false,
                }
            }
        },

    },
    {
        initialRouteName: authenticaded ? 'Principal' : 'Login'
    },
    {
        navigationOptions: ({ navigation }) => {
        }
    }
);

const Routes = (authenticaded) => createAppContainer(StackNavigation_(authenticaded));

export default Routes;