import React, { useState, useEffect } from 'react';
import {Text, Platform, FlatList, View } from 'react-native';
import axios from 'axios';
import { List, Headline, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation}) => {

    const [clientes, guardarClientes] = useState([]);
    const [consultarAPI, guardarConsultarAPI] = useState(true);

    useEffect(() => {
        const obtenerClientesApi = async () => {
            try {
                if(Platform.OS === 'ios'){   
                    //para IOS es el localhost
                    const resultado = await axios.get('http://localhost:3000/clientes');
                    guardarClientes(resultado.data);

                }
                else{
                    //para Android es el ip de la computadora 
                    const resultado = await axios.get('http://192.168.0.102:3000/clientes');
                    guardarClientes(resultado.data);
                }
                guardarConsultarAPI(false);
                
            } catch (error) {
                console.log(error)
            }
        }
        if(consultarAPI){
            obtenerClientesApi();
        }

    }, [consultarAPI])

    return ( 
        <View style={globalStyles.contenedor}>

            <Button icon="plus-circle" onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI})}>
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.titulo}>
                { clientes.length > 0 ? "Clientes" : "Aún no hay"}
            </Headline>

            <FlatList 
                data={clientes}
                keyExtractor={cliente => (cliente.id).toString()}
                renderItem={({item}) => (
                    <List.Item 
                        title={item.nombre}
                        description={item.empresa}
                        onPress={ () => navigation.navigate("DetallesCliente", { item, guardarConsultarAPI }) }
                    />
                )}
            />

            <FAB
                icon="plus"
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", { guardarConsultarAPI }) }
            />

        </View>
     );
}
 
export default Inicio;
