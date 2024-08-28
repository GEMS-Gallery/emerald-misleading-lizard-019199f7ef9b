export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Note = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'category' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'addCategory' : IDL.Func([IDL.Text], [Result], []),
    'addNote' : IDL.Func([IDL.Text, IDL.Text, IDL.Opt(IDL.Text)], [Result], []),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getNotes' : IDL.Func([], [IDL.Vec(Note)], ['query']),
    'removeCategory' : IDL.Func([IDL.Text], [Result], []),
    'updateNote' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
