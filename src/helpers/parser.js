import { Routes } from '../data/Routes';
const ROUTES = Routes;

const CategoryRoutes = () => ROUTES.filter((item) => item.type == 'category');

const IdentifierRoutes = () =>
  ROUTES.filter((item) => item.identifier != undefined);

const SimpleRoutes = () =>
  ROUTES.filter(
    (item) => item.identifier != undefined || item.type != 'category'
  );

// const isEmpty = (value) => {
//   if (Array.isArray(value)) return true;
//   else return false;
// };

function FindQuestionMark(route) {
  if (route != undefined) {
    if ([...route].includes('?')) {
      let mark = route.indexOf('?');
      return [...route].slice(0, mark).join('');
    } else return route;
  }
}

function CurrentPath(arr) {
  let checked = {},
    current_path = '';

  for (const [key, value] of arr) checked[key] = value;

  if (checked.id) current_path = 'id';
  else current_path = Object.keys(checked)[0];

  return checked[current_path];
}

Array.prototype.FilterRoute = function (init_route) {
  let result = {};
  for (let i = 0; i < this.length; i++) {
    if (FindQuestionMark(this[i].route) == FindQuestionMark(init_route))
      result = this[i];
  }
  return result;
};
function WatchParseRoute({
  select,
  current,
  clckAction,
  parsed_arr,
  end_route,
  danger,
}) {
  danger = false;
  if (select.identifier) {
    let find = false;

    if (!select.options.length) {
      danger = true;
      return {
        select,
        current,
        clckAction,
        parsed_arr,
        end_route,
        danger,
      };
    }

    for (let item of select.options) {
      if (item.id == CurrentPath(parsed_arr)) {
        current = {
          data: select.options,
          select: item,
        };
        find = true;
      }
    }

    if (!find) {
      current = {
        data: select.options,
        select: select.options[0],
      };
    }
    end_route = select.route + select.identifier + current.select.id;
  } else if (select.type == 'category') {
    if (clckAction) {
      current = {
        data: select.options,
        select: select.options[0],
      };
      end_route = current.select.route;
    }
  } else {
    end_route = select.route;
    current = {
      data: null,
      select: null,
    };
  }
  clckAction = false;
  return {
    select,
    current,
    clckAction,
    parsed_arr,
    end_route,
    danger,
  };
}

function ParseRoute(
  { select, current, clckAction, parsed_arr, end_route, danger },
  select_route
) {
  danger = false;
  let end = null;
  parsed_arr = [];

  if (select_route.route && select_route.type != 'route') {
    for (const item of new URLSearchParams(select_route.route)) {
      parsed_arr.push(item);
    }

    end = SimpleRoutes().FilterRoute(parsed_arr[0][0]);
    if (!end) end = IdentifierRoutes().FilterRoute(parsed_arr[0][0]);

    select = end;
  }

  if (!end || JSON.stringify(end) == '{}') {
    let find = false;
    CategoryRoutes().forEach((item) => {
      for (const elem of item.options) {
        if (
          FindQuestionMark(elem.route) == FindQuestionMark(select_route.route)
        ) {
          select = item;
          current = {
            data: item.options,
            select: elem,
          };
          find = true;
        }
      }
    });
    if (!find) {
      select = CategoryRoutes().find((item) => item.text == select_route.text);
      current = {
        data: select.options,
        select: select.options[0],
      };
    }
  }
  return { select, current, clckAction, parsed_arr, end_route, danger };
}

export { WatchParseRoute, ParseRoute };
