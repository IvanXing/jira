import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import * as qs from 'qs';
import {cleanObject, useDebounce, useMount} from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debouncedParam = useDebounce(param, 800)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={users} list={list}/>
  </div>
}

export default ProjectListScreen
